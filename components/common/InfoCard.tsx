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
        className='flex h-full w-64 flex-col 
        overflow-hidden rounded-lg border border-slate-300 bg-neutral-100 transition-transform
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
        <div className='flex flex-col justify-center p-4'>
          <h3 className='flex items-center gap-3 text-lg font-bold'>
            {Icon && (
              <span className='rounded-full bg-emerald-600/20 p-2 text-xl text-emerald-600'>
                {<Icon />}
              </span>
            )}
            {title}
          </h3>
          <p className='mt-2 text-sm font-light text-neutral-700'>
            {description}
          </p>
        </div>
      </article>
    </WrapperComponent>
  );
};
