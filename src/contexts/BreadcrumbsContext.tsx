import React, { createContext, PropsWithChildren, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const BreadcrumbsContext = createContext<{
	breadcrumbs: {
		name: string;
		url: string;
	}[];
	setBreadcrumbs: (crumbs: {
		name: string;
		url: string;
	}[]) => void;
}>({
	breadcrumbs: [],
	setBreadcrumbs: () => { },
});

const BreadcrumbsContextProvider = ({ children }: PropsWithChildren) => {
	const location = useLocation();
	const [breadcrumbs, setBreadcrumbs] = useState<{
		name: string;
		url: string;
	}[]>([{
		name: 'Home',
		url: '/',
	}]);

	React.useEffect(() => {
		const crumbs = location.pathname.split('/').filter(Boolean);

		const newBreadcrumbs = [{ name: 'Home', url: '/' }, ...crumbs.map((crumb, index) => {
			const url = crumbs.slice(0, index + 1).join('/');

			return {
				name: crumb,
				url,
			};
		}
		)];
		setBreadcrumbs(newBreadcrumbs);
	}, [location]);

	return (
		<BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
			{children}
		</BreadcrumbsContext.Provider>
	);
};

export default BreadcrumbsContextProvider;
