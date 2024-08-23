import  { useState, useEffect } from 'react';
interface props {
    text: string,
    delay: number,
    setReady?: Function,
    scroll?: Function
}
const Typewriter = ({ text, delay, setReady, scroll }: props) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    // Typing logic goes here
    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
                if(text[currentIndex] == '\n') {
                    scroll && scroll()
                }
            }, delay);
            setReady && setReady(false)
            return () => clearTimeout(timeout);
        } else {
            setReady && setReady(true)
            setTimeout(() => {
                scroll && scroll()
            }, 100)
        }
    }, [currentIndex, delay, text]);

    return <span>{currentText}</span>;
};

export default Typewriter;