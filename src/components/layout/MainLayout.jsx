export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        <main className="flex-1 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
