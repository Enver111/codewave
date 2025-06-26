import Contacts from "../components/contacts";
import Header from "../components/header";

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white font-sans">
      <Header />
      <Contacts />
    </main>
  );
}
