import { useStore } from '@builder.io/mitosis';

export interface CounterProps {
  label?: string;
}

export default function Counter(props: CounterProps) {
  const state = useStore({
    count: 0,
  });

  return (
    <button
      onClick={() => {
        state.count += 1;
      }}
    >
      {props.label || 'Count'}: {state.count}
    </button>
  );
}
