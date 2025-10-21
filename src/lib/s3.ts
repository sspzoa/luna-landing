import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3"

if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error("AWS_ACCESS_KEY_ID environment variable is not defined")
}

if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS_SECRET_ACCESS_KEY environment variable is not defined")
}

if (!process.env.AWS_REGION) {
  throw new Error("AWS_REGION environment variable is not defined")
}

if (!process.env.S3_BUCKET_NAME) {
  throw new Error("S3_BUCKET_NAME environment variable is not defined")
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function uploadImageToS3(
  imageBuffer: Buffer,
  filename: string,
  contentType: string = "image/png"
): Promise<string> {
  const key = `luna-images/${Date.now()}-${filename}`

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: imageBuffer,
    ContentType: contentType,
    ACL: "public-read",
  })

  try {
    await s3Client.send(command)
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  } catch (error) {
    throw new Error(
      `Failed to upload image to S3: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export async function fetchImageFromNotion(url: string): Promise<{
  buffer: Buffer
  filename: string
  contentType: string
}> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Luna-Image-Sync/1.0)",
    },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`
    )
  }

  const buffer = await response.arrayBuffer()

  const urlParts = url.split("/").pop()?.split("?")[0] || "image"
  let filename = urlParts

  const contentType = response.headers.get("content-type") || "image/png"
  if (!filename.includes(".")) {
    const extension = contentType.split("/")[1]?.split(";")[0] || "png"
    filename = `${filename}.${extension}`
  }

  return {
    buffer: Buffer.from(buffer),
    filename,
    contentType,
  }
}

export async function deleteS3Object(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  })

  try {
    await s3Client.send(command)
  } catch (error) {
    throw error
  }
}

export async function deleteAllLunaImages(): Promise<number> {
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: "luna-images/",
  })

  try {
    const listResult = await s3Client.send(listCommand)

    if (!listResult.Contents || listResult.Contents.length === 0) {
      return 0
    }

    const deletePromises = listResult.Contents
      .filter((object) => object.Key)
      .map((object) => deleteS3Object(object.Key!))

    await Promise.all(deletePromises)

    const deletedCount = deletePromises.length
    return deletedCount
  } catch (error) {
    throw error
  }
}

export function extractS3KeyFromUrl(url: string): string | null {
  if (!url.includes(`${process.env.S3_BUCKET_NAME}.s3`)) {
    return null
  }

  const parts = url.split("/")
  const keyIndex = parts.findIndex((part) => part === "luna-images")

  if (keyIndex === -1 || keyIndex + 1 >= parts.length) {
    return null
  }

  return `luna-images/${parts[keyIndex + 1]}`
}