import { useEffect, useState } from 'react'

const HappyBirthday = new Date(2026, 2, 29, 0, 0);

export default function Countdown() {

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {

        const timer = setInterval(() => {
            const now = new Date();
            const diff = HappyBirthday.getTime() - now.getTime()

            if (diff <= 0) {
                setIsFinished(true)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });

        }, 1000)

        return () => clearInterval(timer);

    }, [])

    return (
        <div className="countdown">
            {isFinished
                ?
                'Время вышло (можно подарить чуть позже)'
                :
                <>
                    <span>{timeLeft.days} дн.</span>{' '}
                    <span>{timeLeft.hours} ч.</span>{' '}
                    <span>{timeLeft.minutes} мин.</span>{' '}
                    <span>{timeLeft.seconds} сек.</span>
                </>
            }
        </div>
    )
}