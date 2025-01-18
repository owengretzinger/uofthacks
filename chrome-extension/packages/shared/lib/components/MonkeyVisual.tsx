import { HATS } from '@extension/storage';
import type { MonkeyState } from '@extension/storage';

interface MonkeyVisualProps {
  selectedHat?: string;
  direction?: 'left' | 'right';
  state: MonkeyState;
  className?: string;
}

export const MonkeyVisual = ({ selectedHat, direction = 'left', state, className = '' }: MonkeyVisualProps) => {
  const currentHat = HATS.find(hat => hat.id === selectedHat);

  const getMonkeyImage = () => {
    switch (state) {
      case 'walking':
      case 'leaving':
        return 'animations/walking.GIF';
      case 'dragging':
        return 'animations/flailing.GIF';
      case 'talking':
        return 'animations/speaking.GIF';
      case 'thinking':
        return 'animations/idle.GIF'; // You can create a new thinking animation if desired
      default:
        return 'animations/idle.GIF';
    }
  };

  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `scaleX(${direction === 'left' ? -1 : 1})`,
        pointerEvents: 'none',
        WebkitUserSelect: 'none',
      }}
      draggable={false}
      onDragStart={e => e.preventDefault()}>
      <img
        src={chrome.runtime.getURL(getMonkeyImage())}
        alt="Monkey"
        style={{
          width: `64px`,
          height: `64px`,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        draggable={false}
      />
      {currentHat && state !== 'dragging' && (
        <img
          src={chrome.runtime.getURL(`hats/${currentHat.id}.PNG`)}
          alt={currentHat.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: `64px`,
            height: `64px`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />
      )}
    </div>
  );
};
