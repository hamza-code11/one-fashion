import Navbar from "@/components/website/layout/Navbar/Navbar";
import TopBar from "@/components/website/layout/TopBar/TopBar";
import Footer from "@/components/website/layout/Footer/Footer";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}