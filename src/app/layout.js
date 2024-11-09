

export const metadata = {
  title: "Formulario",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{background: "#808080"}}>

       
        <main
        
        >
          {children}
        </main>
      </body>
    </html>
  );
}
