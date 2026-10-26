import { ArrowRightUpIcon, DownloadIcon } from "@solar-icons/react/linear";
import Image from "next/image";
import { AccentBox } from "@/components/accent-box";
import { OsIcon } from "@/components/os-icon";
import { ReleaseDownloadButton } from "@/components/release-download-button";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { pageMetadata } from "@/lib/page-metadata";
import {
  formatBytes,
  formatReleaseDate,
  getLatestRelease,
  type WalletAsset,
} from "@/lib/releases";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Download",
  description:
    "Download Glyph Wallet for Windows, macOS, and Linux. A self-custodial Qubic wallet.",
  path: "/download",
  image: "/download/opengraph-image",
});

function AssetLink({
  asset,
  fallback,
  label,
}: {
  asset?: WalletAsset;
  fallback: string;
  label: string;
}) {
  return (
    <a
      href={asset?.url ?? fallback}
      target="_blank"
      rel="noreferrer"
      title={asset?.name}
      className="flex items-center gap-3 rounded-xl bg-foreground/5 px-4 py-3 font-mono text-sm transition-colors hover:bg-foreground/10"
    >
      <SiteIcon
        icon={DownloadIcon}
        size={16}
        className="text-muted-foreground"
      />
      <span className="mr-auto font-medium">{label}</span>
      <span className="font-mono text-xs text-muted-foreground">
        {asset ? formatBytes(asset.size) : "GitHub"}
      </span>
    </a>
  );
}

export default async function DownloadPage() {
  const release = await getLatestRelease();
  const releaseUrl = release?.url ?? siteConfig.links.releases;

  return (
    <>
      <section className="site-container flex flex-col items-center py-20 text-center md:py-28">
        <Image
          src="/brand/glyph-on-light.png"
          alt=""
          width={64}
          height={64}
          className="size-14 dark:hidden"
          priority
        />
        <Image
          src="/brand/glyph-on-dark.png"
          alt=""
          width={64}
          height={64}
          className="hidden size-14 dark:block"
          priority
        />

        <h1 className="mt-8 max-w-4xl font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
          Download <AccentBox>Glyph</AccentBox>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          The self-custodial Qubic wallet for Windows, macOS, and Linux.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ReleaseDownloadButton release={release} />
          <SiteButtonLink
            href={releaseUrl}
            external
            variant="secondary"
            size="lg"
          >
            Release notes
            <SiteIcon icon={ArrowRightUpIcon} size={16} />
          </SiteButtonLink>
        </div>

        {release ? (
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            {release.tag} · {formatReleaseDate(release.publishedAt)}
          </p>
        ) : null}
      </section>

      <div className="bg-background">
        <section
          aria-labelledby="platforms-heading"
          className="site-container pb-24 md:pb-32"
        >
          <h2
            id="platforms-heading"
            className="text-center font-display text-3xl tracking-[-0.04em] sm:text-4xl"
          >
            Choose your platform.
          </h2>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <OsIcon os="windows" size={28} />
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.03em]">
                    Windows
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Windows 10 or later, x64
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <AssetLink
                  asset={release?.downloads.windows}
                  fallback={releaseUrl}
                  label="Installer (.exe)"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <OsIcon os="macos" size={28} />
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.03em]">
                    macOS
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Apple Silicon and Intel
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <AssetLink
                  asset={release?.downloads.macos}
                  fallback={releaseUrl}
                  label="Universal (.dmg)"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                <div className="flex items-center gap-3">
                  <OsIcon os="linux" size={28} />
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-[-0.03em]">
                      Linux
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">x86_64</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <AssetLink
                    asset={release?.downloads.appimage}
                    fallback={releaseUrl}
                    label="AppImage"
                  />
                  <AssetLink
                    asset={release?.downloads.deb}
                    fallback={releaseUrl}
                    label="Debian / Ubuntu (.deb)"
                  />
                  <AssetLink
                    asset={release?.downloads.rpm}
                    fallback={releaseUrl}
                    label="Fedora / RHEL (.rpm)"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="install-heading"
          className="site-container pb-24 md:pb-32"
        >
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <h2
                id="install-heading"
                className="font-display text-3xl leading-[1] tracking-[-0.04em] text-balance sm:text-4xl"
              >
                Before you install.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
                Glyph runs on 64-bit Windows, macOS, and Linux desktops. It does
                not run in a browser, on mobile, or on 32-bit systems.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl font-medium tracking-[-0.02em]">
                  Windows
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  Run the installer. Glyph installs for the current user.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-medium tracking-[-0.02em]">
                  macOS
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  Open the DMG and move Glyph to Applications.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-medium tracking-[-0.02em]">
                  Linux
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  Make the AppImage executable and run it, or install the DEB or
                  RPM package.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-foreground/5 p-4 font-mono text-xs leading-relaxed">
                  {`# AppImage
chmod +x Glyph*.AppImage
./Glyph*.AppImage

# Debian / Ubuntu
sudo apt install ./Glyph*.deb

# Fedora / RHEL
sudo dnf install ./Glyph*.rpm`}
                </pre>
              </div>

              {release ? (
                <details>
                  <summary className="cursor-pointer font-display text-xl font-medium tracking-[-0.02em] transition-colors hover:text-foreground">
                    SHA-256 checksums
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                    Compare each hash with the file you downloaded.
                  </p>
                  <div className="mt-5 space-y-5">
                    {release.checksums
                      .filter((asset) => asset.sha256)
                      .map((asset) => (
                        <div key={asset.name}>
                          <p className="font-mono text-xs text-muted-foreground">
                            {asset.name}
                          </p>
                          <p className="mt-1 break-all font-mono text-xs">
                            {asset.sha256}
                          </p>
                        </div>
                      ))}
                  </div>
                </details>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
