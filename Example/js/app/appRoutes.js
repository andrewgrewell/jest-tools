import ScreenOne from './screens/ScreenOne';
import ScreenTwo from './screens/ScreenTwo';
import ScreenThree from './screens/ScreenThree';

const appRoutes = [
    {
        Component: ScreenOne,
        linkText: 'One',
        id: 1
    },
    {
        Component: ScreenTwo,
        linkText: 'Two',
        id: 2
    },
    {
        Component: ScreenThree,
        linkText: 'Three',
        id: 3
    }
];

export const appRoutesLinks = appRoutes.map(r => ({ linkText: r.linkText, id: r.id }));

export default appRoutes;