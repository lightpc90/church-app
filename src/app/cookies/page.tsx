import Link from "next/link";
import LegalPage from "@/components/site/LegalPage";
import { CookieSettingsButton } from "@/components/consent/ConsentBanner";
import { site } from "@/lib/site";

export const metadata = {
  title: "Cookie Policy",
  description: `The cookies ${site.fullName}'s website uses, and how to change your choice.`,
};

// Cookie list checked against the live site on 25 November 2026. Re-check it after moving Clerk to
// production (the __clerk_db_jwt cookies go away; Clerk then sets __client on its own subdomain).
const UPDATED = "25 November 2026";

const contents = [
  { id: "what", label: "What cookies are" },
  { id: "essential", label: "Essential cookies" },
  { id: "media", label: "Videos and maps" },
  { id: "offline", label: "Saved for offline use" },
  { id: "not-used", label: "What we don't use" },
  { id: "choices", label: "Changing your choice" },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Cookie Policy"
      updated={UPDATED}
      intro={
        <>
          <p>
            We keep cookies to a minimum: only what the site needs to work and keep sign-in secure. Anything else
            (YouTube videos and Google Maps) loads only if you say yes.
          </p>
          <CookieSettingsButton className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ink-soft" />
        </>
      }
      contents={contents}
    >
      <h2 id="what">1. What cookies are</h2>
      <p>
        Cookies are small text files a website stores in your browser so it can remember things, like whether
        you&apos;re signed in. Similar technologies, such as your browser&apos;s local storage, work the same way
        and are covered here too.
      </p>

      <h2 id="essential">2. Essential cookies</h2>
      <p>
        These are needed for the site to work and can&apos;t be switched off. Most visitors never sign in, but our
        sign-in provider, Clerk, checks on each visit whether you are.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Set by</th>
              <th>Purpose</th>
              <th>Kept for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>bg_consent</code>
              </td>
              <td>This site</td>
              <td>Remembers your cookie choice</td>
              <td>6 months</td>
            </tr>
            <tr>
              <td>
                <code>__client_uat</code> (and versions ending in a short code)
              </td>
              <td>Clerk</td>
              <td>Tells the site whether you&apos;re signed in</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>
                <code>__session</code> (and versions ending in a short code)
              </td>
              <td>Clerk</td>
              <td>Keeps church staff and workers securely signed in</td>
              <td>About a minute, renewed while you&apos;re signed in</td>
            </tr>
            <tr>
              <td>
                <code>__clerk_db_jwt</code>
              </td>
              <td>Clerk</td>
              <td>Used by our sign-in service while it runs in development mode</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>
                <code>__cf_bm</code>, <code>_cfuvid</code>
              </td>
              <td>Clerk (via Cloudflare), on Clerk&apos;s domain</td>
              <td>Protect the sign-in service from bots and abuse</td>
              <td>30 minutes / until you close your browser</td>
            </tr>
            <tr>
              <td>
                <code>__clerk_environment</code> (local storage)
              </td>
              <td>Clerk</td>
              <td>Stores the sign-in settings so pages load faster</td>
              <td>Until cleared</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="media">3. Videos and maps (only with your consent)</h2>
      <p>
        Our sermon videos are hosted on YouTube, and our location map comes from Google Maps. When these load, Google
        may set cookies or store information in your browser, under{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google&apos;s privacy policy
        </a>
        . We use YouTube&apos;s privacy-enhanced mode, which doesn&apos;t store information about you until you play
        a video.
      </p>
      <p>
        Until you allow &quot;Videos and maps&quot;, you&apos;ll see a placeholder instead. You can play a single video
        or show the map once without changing your setting. Video thumbnails are served from our own site, so Google
        isn&apos;t contacted until you choose to play.
      </p>

      <h2 id="offline">4. Saved for offline use</h2>
      <p>
        The site can be installed as an app and works partly offline. To do that, your browser keeps copies of the
        public pages you&apos;ve visited, images and the site&apos;s own files (a &quot;service worker&quot; cache). No
        personal information is kept there: the dashboard, the workers&apos; area and form submissions are never
        stored. You can clear it at any time in your browser&apos;s site settings.
      </p>
      <p>
        On church desk devices, check-ins made while the connection is down are kept in the browser&apos;s local
        storage (<code>bg_desk_queue_v1</code>: only record numbers and times, no names) until they&apos;re sent, which
        happens automatically once the device is back online.
      </p>

      <h2 id="not-used">5. What we don&apos;t use</h2>
      <p>
        No advertising cookies, no tracking across other websites, and no analytics cookies. If that ever changes,
        we&apos;ll update this page and ask for your consent first.
      </p>

      <h2 id="choices">6. Changing your choice</h2>
      <p>
        Use the <strong>Cookie settings</strong> button above or the link at the bottom of every page. If you switch
        videos and maps off, they stop loading straight away. Cookies Google already set stay until they expire or
        you clear them in your browser&apos;s settings.
      </p>
      <p>
        For more about how we handle personal information, see our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
