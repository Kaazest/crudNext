import NavBar from "@/components/navbar";

export const metadata = {
  title: "Crud",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
