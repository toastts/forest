import ScrapbookLetter from '@/components/ScrapbookLetter';

const fonts = ['font-1', 'font-2', 'font-3', 'font-4', 'font-5'];

const phrase1 = 'TOAST';
const phrase2 = "(toast's own awesome site template)";

const renderPhrase = (phrase: string) => {
  return phrase.split('').map((char, index) => (
    <ScrapbookLetter key={index} letter={char} fontClass={fonts[index % fonts.length]} />
  ));
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream text-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl">
          <div className="flex">
            {renderPhrase(phrase1)}
          </div>
        </h1>
        <h2 className="text-4xl mt-4">
          <div className="flex">
            {renderPhrase(phrase2)}
          </div>
        </h2>
      </div>
    </div>
  );
}

