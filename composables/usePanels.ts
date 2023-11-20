import { defu } from 'defu';

export function usePanels() {
  const app = useAppConfig();

  const panels = computed(
    () =>
      app.layout?.panels?.map((panel) => ({
        ...panel,
        position: (panel as any).position ?? 'left',
        overlay: (panel as any).overlay ?? true,
      })) ?? [],
  );

  const currentName = useState('panels-current-name', () => '');

  // we need to know from which side the panel is coming from
  // and preserve it in the state, so we can animate it when it's closing
  const transitionFrom = useState('panels-transition-from', () => 'left');
  const showOverlay = useState('panels-overlay', () => true);

  const currentProps = useState('panels-current-props', () => ({}));

  const current = computed(() => {
    if (!currentName.value) {
      return undefined;
    }

    return panels.value.find((panel) => panel.name === currentName.value);
  });

  function open(name: string, props?: any) {
    const panel = panels.value.find(({ name: panelName }) => panelName === name);
    if (panel) {
      transitionFrom.value = panel.position;
      currentName.value = panel.name;
      showOverlay.value = panel.overlay;

      // merge props from the panel config and the props passed to the function
      currentProps.value = defu(props ?? {}, (panel as any).props ?? {});
    }
  }
  function close() {
    currentName.value = '';
  }

  return {
    panels,
    current,
    transitionFrom,
    currentProps,
    showOverlay,
    open,
    close,
  };
}
