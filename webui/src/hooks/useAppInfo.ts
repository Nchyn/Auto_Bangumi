export const useAppInfo = createSharedComposable(() => {
  const { auth } = useAuth();
  const running = ref<boolean>(false);
  const version = ref<string>('');

  function getStatus() {
    const { execute, onResult } = useApi(apiProgram.status);

    onResult((res) => {
      running.value = res.status;
      version.value = res.version;
    });

    if (auth.value !== '') {
      execute();
    }
  }

  const { pause: offUpdate, resume: onUpdate } = useIntervalFn(
    getStatus,
    3000,
    {
      immediate: false,
      immediateCallback: true,
    }
  );

  return {
    running,
    version,

    onUpdate,
    offUpdate,
  };
});
