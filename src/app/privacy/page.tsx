import Link from "next/link";
import LegalPage from "@/components/site/LegalPage";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${site.fullName} collects, uses and protects your personal information.`,
};

// Keep in step with what the site actually does. Items marked "church to confirm" in
// docs/HANDOFF.md (retention periods, privacy contact) need the pastorate's sign-off.
const UPDATED = "25 November 2026";

const contents = [
  { id: "who-we-are", label: "Who we are" },
  { id: "what-we-collect", label: "What we collect and why" },
  { id: "sensitive", label: "Faith, location and children's information" },
  { id: "who-sees-it", label: "Who can see your information" },
  { id: "providers", label: "Service providers" },
  { id: "transfers", label: "Information stored outside Nigeria" },
  { id: "retention", label: "How long we keep it" },
  { id: "security", label: "Keeping it safe" },
  { id: "rights", label: "Your rights" },
  { id: "cookies", label: "Cookies" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

const mail = `mailto:${site.email}?subject=Privacy%20request`;

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      updated={UPDATED}
      intro={
        <p>
          When you share a prayer request, a testimony or your details with us, you&apos;re trusting us with
          something personal. This page explains, in plain language, what we collect through this website, why, who
          can see it and the choices you have. We follow the Nigeria Data Protection Act 2023.
        </p>
      }
      contents={contents}
    >
      <h2 id="who-we-are">1. Who we are</h2>
      <p>
        This website is run by <strong>{site.fullName}</strong> ({site.tagline}), a parish of the Redeemed Christian
        Church of God, at {site.address}. We are responsible (the &quot;data controller&quot;) for the personal
        information collected through it.
      </p>

      <h2 id="what-we-collect">2. What we collect and why</h2>
      <p>We only collect what you choose to give us through the forms on this site, plus a little technical information.</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Form</th>
              <th>What we collect</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Prayer request</strong>
              </td>
              <td>Name, phone, email (optional), your prayer request</td>
              <td>So our pastoral and prayer team can pray for you and, if needed, contact you</td>
            </tr>
            <tr>
              <td>
                <strong>Testimony</strong>
              </td>
              <td>Name, phone, email (optional), your testimony</td>
              <td>To rejoice with you and contact you about your testimony</td>
            </tr>
            <tr>
              <td>
                <strong>How can I be saved?</strong>
              </td>
              <td>Name, phone, email (optional), address</td>
              <td>So someone from the church can contact you, pray with you and help you grow in your faith</td>
            </tr>
            <tr>
              <td>
                <strong>Contact form</strong>
              </td>
              <td>Name, phone, email (optional), your message</td>
              <td>To reply to you</td>
            </tr>
            <tr>
              <td>
                <strong>Group and ministry sign-up</strong>
              </td>
              <td>Name, phone, email (optional), gender (for some groups)</td>
              <td>To register you with the group and contact you about its activities</td>
            </tr>
            <tr>
              <td>
                <strong>Children Ministry sign-up</strong>
              </td>
              <td>
                Parent or guardian&apos;s name, phone, email (optional) and gender; the child&apos;s name, gender and date
                of birth
              </td>
              <td>To register the child, place them in the right class and contact their parent or guardian</td>
            </tr>
            <tr>
              <td>
                <strong>Church staff</strong>
              </td>
              <td>Name, email and profile picture from your sign-in account, and your dashboard role</td>
              <td>To let authorised people sign in to the church dashboard</td>
            </tr>
            <tr>
              <td>
                <strong>Workers&apos; registration</strong>
              </td>
              <td>
                Name, phone number, the email address from your sign-in account, department, gender, and optionally your birthday
                (day and month), the area you live in and the year you started serving
              </td>
              <td>To organise the workforce, approve you into your department and keep in touch</td>
            </tr>
            <tr>
              <td>
                <strong>Workers&apos; Sunday attendance</strong>
              </td>
              <td>
                The date and time you checked in, how far from the church you were and how precise your phone&apos;s
                location was. We use your location only at the moment you check in, to confirm you&apos;re within
                100 m of the church, and <strong>we don&apos;t store your location</strong>
              </td>
              <td>To record who served each Sunday</td>
            </tr>
            <tr>
              <td>
                <strong>Workers&apos; desk</strong>
              </td>
              <td>
                For workers without email or a smartphone, desk staff can register them (name, phone, department,
                gender) and check them in. We record that the check-in was made at the desk and by whom
              </td>
              <td>So everyone can serve and be counted, with or without a smartphone</td>
            </tr>
            <tr>
              <td>
                <strong>Children&apos;s check-in</strong>
              </td>
              <td>
                The child&apos;s details as for Children Ministry sign-up (registered at the desk only with a parent or
                guardian present and agreeing), plus the date and time they were checked in and who checked them in
              </td>
              <td>To know which children are in our care, and to keep attendance records</td>
            </tr>
            <tr>
              <td>
                <strong>Everyone</strong>
              </td>
              <td>Technical information such as your IP address, browser and the pages you visit, kept in server logs</td>
              <td>To run the website, keep it secure and fix problems</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Our legal basis.</strong> For the forms marked with a consent checkbox we rely on your{" "}
        <strong>consent</strong>, which you can withdraw at any time. For the contact form, staff accounts and
        technical logs we rely on our <strong>legitimate interest</strong> in answering you, running the church
        dashboard and keeping the site secure. We never sell your information or use it for advertising.
      </p>

      <h2 id="sensitive">3. Faith, location and children&apos;s information</h2>
      <p>
        Prayer requests, testimonies and decisions to follow Christ say something about your religious beliefs. The
        law treats this as <strong>sensitive personal data</strong>, so we ask for your explicit consent before you
        send those forms and limit who can see them (see below).
      </p>
      <p>
        Children&apos;s details are only collected from a <strong>parent or guardian</strong>, who confirms they
        agree when registering the child. If you&apos;re under 18 and want to join the Teens Ministry, please ask a
        parent or guardian to agree to it too.
      </p>

      <h2 id="who-sees-it">4. Who can see your information</h2>
      <ul>
        <li>
          <strong>Authorised church staff only</strong>, each seeing only what their role needs. Prayer requests,
          testimonies, new converts and messages are seen by pastors and administrators. Heads of department see
          group registrations, and the workers and attendance of their own department.
        </li>
        <li>
          <strong>Alerts:</strong> when a prayer request or new convert comes in, designated members of the pastoral
          team may receive an email or WhatsApp alert so they can respond quickly. WhatsApp alerts contain your name,
          phone number and a link to the dashboard, not your prayer request itself, unless the church has chosen to
          include it.
        </li>
        <li>
          House fellowship hosts&apos; names, phone numbers and addresses aren&apos;t published on the website;
          the church shares a center&apos;s details only with people who ask to join it.
        </li>
        <li>
          We don&apos;t publish your prayer request, testimony or details on the website, and we won&apos;t share
          them outside the church except with the service providers below, or where the law requires it.
        </li>
      </ul>

      <h2 id="providers">5. Service providers</h2>
      <p>We use a few trusted companies to run the site. They process information only on our behalf:</p>
      <ul>
        <li>
          <strong>Vercel</strong>: hosts the website and keeps server logs.
        </li>
        <li>
          <strong>MongoDB Atlas</strong>: stores the information you submit, in a secure database.
        </li>
        <li>
          <strong>Clerk</strong>: handles sign-in for church staff and workers (including &quot;Sign in with
          Google&quot;).
        </li>
        <li>
          <strong>Resend</strong>: delivers email alerts to the church team.
        </li>
        <li>
          <strong>CallMeBot</strong>: delivers WhatsApp alerts to the church team, when that is switched on.
        </li>
        <li>
          <strong>Google (YouTube and Google Maps)</strong>: sermon videos and our location map, which load only if
          you allow them (see <a href="#cookies">Cookies</a>).
        </li>
        <li>
          <strong>Instagram</strong>: our latest posts are fetched by our server and shown here. Your browser
          doesn&apos;t contact Instagram unless you follow a link to it.
        </li>
      </ul>

      <h2 id="transfers">6. Information stored outside Nigeria</h2>
      <p>
        Some of these providers store or process information outside Nigeria (for example in the United States or
        Europe). We use providers that protect personal information with security measures and contractual
        commitments consistent with the Nigeria Data Protection Act, and we send them only what they need to do
        their job.
      </p>

      <h2 id="retention">7. How long we keep it</h2>
      <ul>
        <li>
          <strong>Prayer requests, testimonies and contact messages:</strong> up to 12 months after we receive them.
        </li>
        <li>
          <strong>New converts:</strong> while we&apos;re following up with you, and no longer than 2 years.
        </li>
        <li>
          <strong>Group and ministry registrations:</strong> while you&apos;re part of the group. For children, until
          they leave the Children Ministry.
        </li>
        <li>
          <strong>Staff and worker accounts:</strong> while you serve in that role.
        </li>
        <li>
          <strong>Workers&apos; and children&apos;s attendance:</strong> up to 2 years.
        </li>
        <li>
          <strong>Server logs:</strong> for a short period set by our hosting provider.
        </li>
      </ul>
      <p>You can ask us to delete your information sooner at any time.</p>

      <h2 id="security">8. Keeping it safe</h2>
      <p>
        Information travels over encrypted connections (HTTPS) and is stored in a secured, password-protected
        database. Only signed-in staff with the right role can open it, and every action on the dashboard is checked
        on our server. No system is perfectly secure, but we work to protect your information and will act quickly
        if something goes wrong, including telling you and the regulator where the law requires.
      </p>

      <h2 id="rights">9. Your rights</h2>
      <p>Under the Nigeria Data Protection Act you can ask us to:</p>
      <ul>
        <li>tell you what information we hold about you and give you a copy;</li>
        <li>correct anything that&apos;s wrong or incomplete;</li>
        <li>delete your information;</li>
        <li>stop or limit how we use it, or object to it being used;</li>
        <li>give you your information in a format you can take elsewhere;</li>
        <li>withdraw your consent at any time (this doesn&apos;t affect what we did before you withdrew it).</li>
      </ul>
      <p>
        To do any of this, <a href={mail}>email us</a> or speak to the church office. We&apos;ll respond within 30
        days. If you&apos;re unhappy with how we&apos;ve handled your information, you can complain to the{" "}
        <a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer">
          Nigeria Data Protection Commission
        </a>
        .
      </p>

      <h2 id="cookies">10. Cookies</h2>
      <p>
        We use only the cookies needed to run the site and keep sign-in secure. YouTube videos and Google Maps load
        only if you allow them, because Google may set its own cookies. We don&apos;t use advertising or tracking
        cookies. See our <Link href="/cookies">Cookie Policy</Link> for the full list and to change your choice.
      </p>

      <h2 id="changes">11. Changes to this policy</h2>
      <p>
        If we change how we use your information, we&apos;ll update this page and the date at the top. For
        significant changes we&apos;ll make it clear on the website.
      </p>

      <h2 id="contact">12. Contact us</h2>
      <p>
        {site.fullName}
        <br />
        {site.address}
        <br />
        Email: <a href={mail}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
