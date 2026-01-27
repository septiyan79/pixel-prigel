import { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#FFFBF7] text-gray-900 selection:bg-orange-200 flex items-center justify-center p-6 overflow-hidden relative">

            {/* Dekorasi Latar Belakang */}
            <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-20"></div>

            {/* Kontainer Utama */}
            <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white border-4 border-black rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10">

                {/* SISI KIRI: Visual/Branding */}
                <div className="bg-orange-500 p-10 flex flex-col justify-between relative border-r-4 border-black md:flex">
                    <div className="z-10">
                        <h2 className="text-white text-4xl font-black leading-none italic uppercase tracking-tighter">
                            Welcome <br className="hidden md:block" /> Back, <br /> Creator!
                        </h2>
                        <p className="text-orange-100 mt-4 font-bold text-sm uppercase tracking-wide">
                            Ready to grab some more <br /> sticky goodness?
                        </p>
                    </div>

                    {/* Elemen Dekoratif Sticker-like */}
                    <div className="absolute bottom-10 right-15 md:right-auto md:left-10 transform -rotate-12 bg-white border-2 border-black p-2 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-xs font-black uppercase text-orange-600">✨ Pixel Prigel</span>
                    </div>

                    <div className="absolute flex
                                    flex-row -bottom-12
                                    md:flex-col md:top-1/2 md:-right-5 transform -translate-y-1/2 gap-4">
                        <div className="w-12 h-12 bg-yellow-300 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                        <div className="w-12 h-12 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                    </div>
                </div>

                {/* SISI KANAN: Form Login */}
                <div className="p-8 md:p-12 bg-white">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-orange-600">Login</h1>
                        <p className="text-gray-500 font-bold text-sm">Enter your details to access your assets.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Input Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="hello@pixelprigel.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 bg-white border-3 border-black rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        {/* Input Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <label className="text-xs font-black uppercase tracking-widest ml-1">Password</label>
                                <a href="#" className="text-[10px] font-black uppercase text-orange-600 hover:underline">Forgot?</a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-white border-3 border-black rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-orange-600 text-white border-3 border-black rounded-2xl font-black text-lg uppercase italic tracking-tighter shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                        >
                            {loading ? "Logging in..." : "Let's Stick It!"}
                        </button>
                    </form>

                    {/* Social Login Divider */}
                    <div className="relative my-8 text-center">
                        <span className="bg-white px-4 relative z-10 text-[10px] font-black uppercase text-gray-400 tracking-widest">Or Continue With</span>
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-3 border-3 border-black rounded-xl font-bold text-xs uppercase hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1">
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 border-3 border-black rounded-xl font-bold text-xs uppercase hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1">
                            Github
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="mt-8 text-center text-sm font-bold text-gray-500">
                        Don't have an account? <br className="md:hidden" />
                        <a href="#" className="text-orange-600 hover:underline underline-offset-4">Create Free Account</a>
                    </p>
                </div>
            </div>

            {/* Floating Logo (Mobile Only) */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 md:hidden">
                <span className="font-black text-2xl tracking-tighter text-orange-600 italic">Pixel Prigel</span>
            </div>

        </div>
    );
};

export default Login;