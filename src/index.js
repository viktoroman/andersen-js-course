import './styles/main.css';
// import Item from './model/Item';
// import Recipe from './model/Recipe';
import CraftSpaceController from './controller/CraftTableController';

// tests
/*
import testModelClasses from './test/testModelClasses';

testModelClasses();
*/

// tests
/*
import testInitDefaultEntities from './test/testInitDefaultEntities';

testInitDefaultEntities();
*/

const craftSpaceController = new CraftSpaceController();
craftSpaceController.initDefaultEntities();
