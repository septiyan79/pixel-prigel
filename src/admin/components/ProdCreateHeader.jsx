import { GoChevronLeft } from "react-icons/go";
import { NavLink } from "react-router-dom";

export default function ProdCreateHeader() {
    return (
        <div className="flex items-center justify-between">
            <NavLink
                to="/admin/product/"
                className="group mb-6 flex items-center gap-2 px-3 py-2 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
                <div className="flex items-center justify-center w-5 h-5 bg-orange-100 border border-black rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <GoChevronLeft />
                </div>
                <span className="font-black text-[10px] uppercase tracking-widest">Back to List</span>
            </NavLink>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, active: false }))}
                    className="px-6 py-2 bg-white border-2 border-black rounded-xl font-black text-[11px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all">
                    Save Draft
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white border-2 border-black rounded-xl font-black text-[11px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all"
                >
                    Publish Now
                </button>
            </div>
        </div>
    );
}