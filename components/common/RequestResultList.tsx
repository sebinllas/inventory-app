interface RequestResultListProps<T> {
	data: T[] | undefined;
	isError: boolean;
	isLoading: boolean;
	errorComponent?: JSX.Element;
	loadingComponent?: JSX.Element;
	noDataComponent?: JSX.Element;
	itemRenderer: (item: T) => JSX.Element;
}

export const RequestResultList = <T,>({
	data,
	isError,
	isLoading,
	errorComponent = <div>Failed to load data</div>,
	loadingComponent = <div>Loading...</div>,
	noDataComponent = <div>No data found</div>,
	itemRenderer,
}: RequestResultListProps<T>) => {
	if (isLoading) return loadingComponent;
	if (isError) return errorComponent;
	if (data) {
		if (data.length === 0) return noDataComponent;
		return data.map(itemRenderer);
	}
};
