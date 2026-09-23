import Navbar from "@/components/layout/Navbar/Navbar";
import TopBar from "@/components/layout/TopBar/TopBar";
import Footer from "@/components/layout/Footer/Footer";

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