declare global  {
  namespace KV_FROM_RUST {
    function put(key: string, value: string): void
  }
}

export {}