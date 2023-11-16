import { IconType } from '@/types/icon';
import Link from 'next/link';
import Image from 'next/image';

export const InfoCard = ({
  title,
  icon: Icon,
  description,
  href,
  image,
}: {
  title?: string;
  icon?: IconType;
  description: string;
  href?: string;
  image?: string;
}) => {
  const WrapperComponent = href ? Link : 'div';
  return (
    <WrapperComponent href={href ?? '#'}>
      <article
        className='border border-slate-300 rounded-lg bg-neutral-100 
        transition-transform overflow-hidden h-full flex flex-col w-64
        hover:scale-105'
      >
        {image && (
          <Image
            src={image}
            alt={title || description}
            width={256}
            height={256}
            className='rounded-lg shadow-md'
          />
        )}
        <div className='p-4 flex flex-col justify-center'>
          <h3 className='flex gap-3 items-center font-bold text-lg'>
            {Icon && (
              <span className='text-emerald-600 bg-emerald-600/20 rounded-full p-2 text-xl'>
                {<Icon />}
              </span>
            )}
            {title}
          </h3>
          <p className='font-light text-neutral-700 text-sm mt-2'>
            {description}
          </p>
        </div>
      </article>
    </WrapperComponent>
  );
};
