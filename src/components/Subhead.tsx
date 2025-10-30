interface HeaderProps {
  name: string;
}

export default function Subhead({ name }: HeaderProps) {
  return (
    <div className="text-center text-[1.2rem] uppercase text-gtc-hue">
      {name}
       <div className="block text-[1.1rem] text-center mb-0 uppercase text-rose-400 font-normal mt-1">
        {new Date().toLocaleDateString('en-SG', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric',
        timeZone: 'Asia/Singapore'
      })}
        </div>
    </div>
  );
}