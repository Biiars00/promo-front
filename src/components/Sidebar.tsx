import { Button } from './Button';

export const Sidebar = () => {
  return (
    <aside className="w-60 bg-white border-r p-4 flex flex-col justify-between">
        <div>
            <h1 className="text-2xl font-bold mb-6">ISI Promo<span className="font-extrabold"> ◐</span></h1>
            <div className="flex items-center gap-2 text-gray-700 font-medium p-2 rounded bg-gray-100">
            🛍️ Produtos
            </div>
        </div>
        <Button className="text-red-500 hover:text-red-700 flex items-center gap-1">Sair</Button>
    </aside>
  );
};