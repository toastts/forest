import "../globals.css";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: handle sidebars and layout properly
  return (
    <div className="flex flex-row min-h-screen flex-nowrap justify-between">
      <div className="w-1/3 text-white p-4 border-2 border-dark-border-primary">
        {/* Left Sidebar Content */}
      </div>

      <div className="w-2/3 flex-grow p-16 border-2 border-dark-border-primary">
        {children}
      </div>

      <div className="w-1/3 text-white p-4 border-2 border-dark-border-primary">
        {/* Right Sidebar Content */}
      </div>
    </div>
  );
}
