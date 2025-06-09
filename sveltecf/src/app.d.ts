// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        interface Platform {
            env: {
                COUNTER: DurableObjectNamespace;
            };
            context: {
                // eslint-disable-next-line no-undef
                waitUntil(promise: Promise<any>): void;
            };
            caches: CacheStorage & { default: Cache };
        }
    }
}

export {};
