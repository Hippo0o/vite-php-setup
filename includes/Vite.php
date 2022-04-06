<?php

class Vite
{
    public string $entry;
    public bool $isDev;
    public string $publicUrl;
    public string $publicPath;
    public string $viteServer;

    public function __construct(
        string $entry,
        bool $isDev = true,
        string $publicPath = __DIR__ . '/dist/',
        string $publicUrl = '/dist/',
        string $viteServer = 'http://localhost:3000/'
    ) {
        $this->entry = $entry;
        $this->isDev = $isDev;
        $this->publicPath = $publicPath; // basically the filesystem dir the manifest.json is written to
        $this->publicUrl = $publicUrl;
        $this->viteServer = $viteServer;
    }

    // Prints all the html entries needed for Vite
    public function __toString(): string
    {
        if ($this->isDev) {
            return $this->devEnv();
        }
        return implode("\n", [$this->jsTag(), $this->jsPreloadImports(), $this->cssTag()]);
    }


    // Helpers to print tags
    public function jsTag(): string
    {
        return "<script type='module' crossorigin src='{$this->assetUrl()}'></script>";
    }

    public function jsPreloadImports(): string
    {
        $html = '';
        foreach ($this->importsUrls() as $url) {
            $html .= "<link rel='modulepreload' href='$url'>";
        }
        return $html;
    }

    public function cssTag(): string
    {
        $html = '';
        foreach ($this->cssUrls() as $url) {
            $html .= "<link rel='stylesheet' href='$url'>";
        }
        return $html;
    }

    /*
     * The server running PHP might not have direct access to localhost, so the check is handled client-side.
     * Checks for the vite dev server being available and loads built assets if necessary.
     */
    protected function devEnv(): string
    {
        $hash = substr(sha1(uniqid($this->viteServer)), -6);
        return "
          <script id='vite-dev-$hash' type='module' crossorigin src='{$this->viteServer}{$this->entry}'></script>
          <template id='vite-build-$hash'>
            {$this->jsTag()}
            {$this->jsPreloadImports()}
            {$this->cssTag()}
          </template>
          <script id='vite-devcheck-$hash'>
            const template_$hash = document.getElementById('vite-build-$hash');
            const controller_$hash = new AbortController();
            const timeoutId_$hash = setTimeout(() => controller_$hash.abort(), 1000);
            fetch('{$this->viteServer}{$this->entry}', { signal: controller_$hash.signal })
              .then((res) => {
                if(res.status === 404) {
                    throw null;
                }
                clearTimeout(timeoutId_$hash);
                template_$hash.remove();
              })
              .catch(() => {
                document.getElementById('vite-dev-$hash').append(document.importNode(template_$hash.content, true));
                template_$hash.remove();
              });
            document.getElementById('vite-devcheck-$hash').remove();
          </script>
        ";
    }

    // Helpers to locate files
    public function getManifest(): array
    {
        $content = @file_get_contents($this->publicPath . 'manifest.json');

        return json_decode($content, true) ?? [];
    }

    public function assetUrl(): string
    {
        $manifest = $this->getManifest();

        return isset($manifest[$this->entry])
            ? $this->publicUrl . $manifest[$this->entry]['file']
            : '';
    }

    public function importsUrls(): array
    {
        $urls = [];
        $manifest = $this->getManifest();

        if (!empty($manifest[$this->entry]['imports'])) {
            foreach ($manifest[$this->entry]['imports'] as $imports) {
                $urls[] = $this->publicUrl . $manifest[$imports]['file'];
            }
        }
        return $urls;
    }

    public function cssUrls(): array
    {
        $urls = [];
        $manifest = $this->getManifest();

        if (!empty($manifest[$this->entry]['css'])) {
            foreach ($manifest[$this->entry]['css'] as $file) {
                $urls[] = $this->publicUrl . $file;
            }
        }
        return $urls;
    }
}

