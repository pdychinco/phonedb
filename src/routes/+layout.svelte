<script lang="ts">
    import '../app.postcss';
    import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead">
                <a href="/" class="text-xl font-bold">PhoneDB</a>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <div class="flex gap-4">
                    <div class="relative group">
                        <button class="btn variant-filled">
                            Phones
                        </button>
                        <div class="hidden group-hover:block absolute right-0 top-full w-48 bg-surface-700 rounded-lg shadow-lg z-50">
                            <nav class="list-nav">
                                <ul>
                                    <li><a href="/phones/apple" class="!text-white hover:!bg-surface-600">Apple</a></li>
                                    <li><a href="/phones/samsung" class="!text-white hover:!bg-surface-600">Samsung</a></li>
                                    <li><a href="/phones/google" class="!text-white hover:!bg-surface-600">Google</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div class="relative group">
                        <button class="btn variant-filled">
                            Carriers
                        </button>
                        <div class="hidden group-hover:block absolute right-0 top-full w-48 bg-surface-700 rounded-lg shadow-lg z-50">
                            <nav class="list-nav">
                                <ul>
                                    <li><a href="/carriers/telus" class="!text-white hover:!bg-surface-600">Telus</a></li>
                                    <li><a href="/carriers/rogers" class="!text-white hover:!bg-surface-600">Rogers</a></li>
                                    <li><a href="/carriers/bell" class="!text-white hover:!bg-surface-600">Bell</a></li>
                                    <li><a href="/carriers/koodo" class="!text-white hover:!bg-surface-600">Koodo</a></li>
                                    <li><a href="/carriers/fido" class="!text-white hover:!bg-surface-600">Fido</a></li>
                                    <li><a href="/carriers/virgin" class="!text-white hover:!bg-surface-600">Virgin+</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <main class="container mx-auto p-4">
        <slot />
    </main>
</AppShell>

<style>
    .group:hover > div {
        display: block;
    }
</style>
