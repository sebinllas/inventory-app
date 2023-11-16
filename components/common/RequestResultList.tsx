import { ElementType, Fragment } from 'react';
import { Loading } from './Loading';

interface RequestResultListProps<T> {
  data: T[] | undefined;
  isError?: boolean;
  isLoading?: boolean;
  wrapperComponent?: ElementType;
  errorComponent?: JSX.Element;
  loadingComponent?: JSX.Element;
  noDataComponent?: JSX.Element;
  itemRenderer: (item: T, index: number) => JSX.Element;
}

export const RequestResultList = <T,>({
  data,
  isError = false,
  isLoading = false,
  errorComponent = (
    <MessageContainer>
      <p>Failed to load data</p>
    </MessageContainer>
  ),
  loadingComponent = (
    <MessageContainer>
      <Loading />
    </MessageContainer>
  ),
  noDataComponent = (
    <MessageContainer>
      <p>No data found</p>
    </MessageContainer>
  ),
  itemRenderer,
  wrapperComponent: Wrapper = Fragment,
}: RequestResultListProps<T>) => {
  if (isLoading) return loadingComponent;
  if (isError) return errorComponent;
  if (data) {
    if (data.length === 0) return noDataComponent;
    return <Wrapper>{data.map(itemRenderer)}</Wrapper>;
  }
};

const MessageContainer = ({ children }: { children: JSX.Element }) => {
  return <div className='flex justify-center'>{children}</div>;
};
