import { Composition } from 'remotion';
import { StoryComposition } from './StoryComposition';

export const RemotionRoot = () => (
  <Composition
    id="StoryAd"
    component={StoryComposition}
    durationInFrames={468}
    fps={30}
    width={1080}
    height={1920}
  />
);
