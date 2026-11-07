import { Attachments } from "./components/Attachments";
import { Contact } from "./components/Contact";
import { Exhibits } from "./components/Exhibits";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { History } from "./components/History";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Header />
        <main>
          <Hero />
          <History />
          <Exhibits />
          <Attachments />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
