import NavBar from "@/components/navbar";

export const metadata = {
  title: "Formulario",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            marginTop: "50px",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
