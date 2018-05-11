import ScreenOne from './screens/ScreenOne';

const appRoutes = [
    {
        Component: ScreenOne,
        linkText: 'One',
        id: 1
    },
    {
        Component: ScreenOne,
        linkText: 'Two',
        id: 2
    },
    {
        Component: ScreenOne,
        linkText: 'Three',
        id: 3
    }
];

export const appRoutesLinks = appRoutes.map(r => ({ linkText: r.linkText, id: r.id }));

export default appRoutes;