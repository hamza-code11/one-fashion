import Navbar from "@/components/website/Navbar/Navbar";
// import Footer from "@/components/Footer/Footer";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      {/* <Footer /> */}
    </>
  );
}