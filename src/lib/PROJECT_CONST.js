import Item from '../model/Item';
import Recipe from '../model/Recipe';

// support object
const PROJECT_CONST = (() => {
  // messages for event handlers
  const utilityEventMessages = {
    CRAFT_ITEM: 'CRAFT_ITEM',
    CRAFT_RECIPE: 'CRAFT_RECIPE',
    CRAFTTABLE_DROP_ITEM: 'CRAFTTABLE_DROP_ITEM',
    CRAFTTABLE_DROP_RECIPE: 'CRAFTTABLE_DROP_RECIPE',
    INVENTORY_DROP_ITEM: 'INVENTORY_DROP_ITEM',
    INVENTORY_DROP_RECIPE: 'INVENTORY_DROP_RECIPE',
    SELECT_ENTITY: 'SELECT_ENTITY',
  };

  // UI messages
  const utilityUIMessages = {
    EMPTY_INPUTS: 'Fill all inputs!!',
    RECIPE_MISSING: 'Recipe is missing!!',
    ITEMS_MISSING: 'Items are missing!!',
    ITEM_ALREADY_EXISTS: 'This item is already there!!',
    RECIPE_ALREADY_EXISTS: 'This recipe is already there!!',
    RECIPE_WRONG: 'Recipe is wrong!!',
    ITEM_CRAFTED: 'New item has been created!!',
    RECIPE_CRAFTED: 'New recipe has been created!!',
  };

  // Entity constants
  const utilityEntityConstants = {
    CLASS_ITEM: 'item',
    CLASS_RECIPE: 'recipe',
    TYPE_ITEM: 'item',
    TYPE_RECIPE: 'recipe',
  };

  // set of
  const utilityDefaultEntities = (() => {
    // basic items
    const wood = new Item('Древесина', 'Единица древесины');
    const iron = new Item('Метал', 'Единица метала');
    const glass = new Item('Стекло', 'Единица стекла');
    const textile = new Item('Ткань', 'Единица ткани');

    // complex items
    const chair = new Item('Стул', 'Деревянный стул');
    const table = new Item('Стол', 'Деревянный стол');
    const wndw = new Item('Окно', 'Окно с деревянной рамой');
    const armChair = new Item('Кресло', 'Кресло');
    const sofa = new Item('Диван', 'Диван');
    const moderTable = new Item('Стильный стол', 'Моднейший стол со стеклянным покрытием');
    const door = new Item('Дверь', 'Деревянная дверь');
    const ironDoor = new Item('Стальная дверь', 'Прочная стальная дверь');
    const mirror = new Item('Зеркало', 'Зеркало');
    const wardrobe = new Item('Шкаф', 'Вместительный гардеробный шкаф');
    const fullSet = new Item('Мебельный сет', 'Набор мебели');
    const bagWithBrokenGlass = new Item(
      'Мешок с битым стеклом',
      'Абсолютно бесполезная вещь. Зачем он - неизвестно. Но можно поставить себе в комнату и говорить гостям, что это моднейший арт объект, а Вы - величайший ценитель-эстет современности'
    );

    const chairRecipe = new Recipe(chair.clone(), wood.clone(), iron.clone());
    const tableRecipe = new Recipe(table.clone(), wood.clone(), wood.clone(), iron.clone());
    const wndwRecipe = new Recipe(wndw.clone(), wood.clone(), glass.clone(), glass.clone());
    const armChairRecipe = new Recipe(armChair.clone(), chair.clone(), textile.clone());
    const sofaRecipe = new Recipe(
      sofa.clone(),
      wood.clone(),
      wood.clone(),
      iron.clone(),
      textile.clone(),
      textile.clone()
    );
    const moderTableRecipe = new Recipe(moderTable.clone(), table.clone(), glass.clone());
    const doorRecipe = new Recipe(door.clone(), wood.clone(), wood.clone(), iron.clone());
    const ironDoorRecipe = new Recipe(ironDoor.clone(), door.clone(), iron.clone(), iron.clone());
    const mirrorRecipe = new Recipe(mirror.clone(), wood.clone(), glass.clone(), iron.clone());
    const wardrobeRecipe = new Recipe(
      wardrobe.clone(),
      mirror.clone(),
      wood.clone(),
      wood.clone(),
      wood.clone(),
      iron.clone(),
      iron.clone()
    );
    const fullSetRecipe = new Recipe(
      fullSet.clone(),
      chair.clone(),
      table.clone(),
      armChair.clone(),
      sofa.clone(),
      moderTable.clone(),
      mirror.clone(),
      wardrobe.clone()
    );
    const bagWithBrokenGlassRecipe = new Recipe(
      bagWithBrokenGlass.clone(),
      textile.clone(),
      glass.clone()
    );

    return {
      item: [wood, iron, glass, textile],
      recipe: [
        chairRecipe,
        tableRecipe,
        wndwRecipe,
        armChairRecipe,
        sofaRecipe,
        moderTableRecipe,
        doorRecipe,
        ironDoorRecipe,
        mirrorRecipe,
        wardrobeRecipe,
        fullSetRecipe,
        bagWithBrokenGlassRecipe,
      ],
    };
  })();

  return {
    eventMessages: utilityEventMessages,
    entityConstants: utilityEntityConstants,
    defaultEntities: utilityDefaultEntities,
    UIMessages: utilityUIMessages,
  };
})();

export default PROJECT_CONST;
