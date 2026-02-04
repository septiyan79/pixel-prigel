import { useEffect, useRef } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const IDLE_TIME = 30 * 60 * 1000;

export default function useIdleLogout() {
    const timerRef = useRef(null);
    const auth = getAuth();

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            signOut(auth);
            console.log("User Logout because idle for 30 minutes");
        }, IDLE_TIME);
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "click", "scroll"];

        const startIdleTimer = () => {
            events.forEach(event =>
                window.addEventListener(event, resetTimer)
            );
            resetTimer();
        };

        const stopIdleTimer = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach(event =>
                window.removeEventListener(event, resetTimer)
            );
        };

        const unsubscribeAuth = onAuthStateChanged(auth, user => {
            if (user) {
                startIdleTimer();
            } else {
                stopIdleTimer();
            }
        });

        return () => {
            stopIdleTimer();
            unsubscribeAuth();
        };
    }, []);
}