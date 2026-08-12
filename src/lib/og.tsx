import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL } from '@/lib/seo';
import { ImageResponse } from 'next/og';

export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const OG_CONTENT_TYPE = 'image/png';

export type OgImageProps = {
  title: string;
  eyebrow?: string;
  showModel?: boolean;
};

const ROOT = process.cwd();

async function loadAsset(relativePath: string) {
  return readFile(join(ROOT, relativePath));
}

export async function createOgImage({ title, eyebrow = '세상을 비추는 달,', showModel = true }: OgImageProps) {
  const [fontBold, fontMedium, modelPng] = await Promise.all([
    loadAsset('src/assets/fonts/Pretendard-Bold.otf'),
    loadAsset('src/assets/fonts/Pretendard-Medium.otf'),
    showModel ? loadAsset('public/images/home/luna_model.png') : Promise.resolve(null),
  ]);

  const modelSrc = modelPng ? `data:image/png;base64,${modelPng.toString('base64')}` : null;
  const titleSize = title.length > 10 ? 72 : title.length > 6 ? 92 : 108;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        backgroundColor: '#FAFAFF',
        color: '#2B274B',
        fontFamily: 'Pretendard',
        overflow: 'hidden',
      }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          backgroundImage:
            'radial-gradient(circle at 78% 50%, rgba(144, 127, 223, 0.18) 0%, rgba(144, 127, 223, 0.06) 36%, rgba(250, 250, 255, 0) 64%)',
        }}
      />

      {modelSrc ? (
        <img
          src={modelSrc}
          alt=""
          width={500}
          height={418}
          style={{
            position: 'absolute',
            right: 40,
            top: 105,
            width: 500,
            height: 418,
            objectFit: 'contain',
          }}
        />
      ) : null}

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 28,
          width: showModel ? 620 : 1040,
          height: '100%',
          paddingLeft: 80,
          paddingRight: 40,
        }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontWeight: 500,
              color: '#907FDF',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
            }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize,
              fontWeight: 800,
              color: '#524B9B',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              whiteSpace: 'pre-wrap',
            }}>
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 8,
            fontSize: 22,
            fontWeight: 700,
            color: '#3A3A60',
            opacity: 0.45,
            letterSpacing: '-0.02em',
          }}>
          {SITE_URL.replace('https://', '')}
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        {
          name: 'Pretendard',
          data: fontMedium,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'Pretendard',
          data: fontBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Pretendard',
          data: fontBold,
          style: 'normal',
          weight: 800,
        },
      ],
    },
  );
}
