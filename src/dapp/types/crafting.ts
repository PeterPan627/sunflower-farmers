import Token from "../../abis/Token.json";
import Farm from "../../abis/Farm.json";
import Axe from "../../abis/Axe.json";
import Wood from "../../abis/Wood.json";
import Pickaxe from "../../abis/Pickaxe.json";
import StonePickaxe from "../../abis/StonePickaxe.json";
import IronPickaxe from "../../abis/IronPickaxe.json";
import Stone from "../../abis/Stone.json";
import Gold from "../../abis/Gold.json";
import Iron from "../../abis/Iron.json";
import Statue from "../../abis/Statue.json";
import ChristmasTree from "../../abis/ChristmasTree.json";
import Scarecrow from "../../abis/Scarecrow.json";

import pickaxe from "../images/ui/pickaxe.png";
import woodPickaxe from "../images/ui/wood_pickaxe.png";
import axe from "../images/ui/axe.png";
import hammer from "../images/ui/hammer.png";
import rod from "../images/ui/rod.png";
import sword from "../images/ui/sword.png";
import wood from "../images/ui/wood.png";
import iron from "../images/ui/ore.png";
import stone from "../images/ui/rock.png";
import chickenCoop from "../images/ui/chicken_coop.png";
import coin from "../images/ui/sunflower_coin.png";
import statue from "../images/ui/sunflower_statue.png";
import christmasTree from "../images/ui/christmas_tree.png";
import scarecrow from "../images/ui/scarecrow.png";

export interface Ingredient {
  name: "Wood" | "Stone" | "$SFF" | "Iron" | "Gold";
  image: any;
  amount: number;
}

export interface Recipe extends Item {
  ingredients: Ingredient[];
}

export interface Item {
  name:
    | "Axe"
    | "Wood pickaxe"
    | "Stone Pickaxe"
    | "Iron Pickaxe"
    | "Fishing rod"
    | "Hammer"
    | "Stone"
    | "Wood"
    | "Iron"
    | "Gold"
    | "Sword"
    | "Chicken coop"
    | "Sunflower Statue"
    | "Christmas Tree"
    | "Scarecrow";
  description: string;
  address: string;
  image: any;
  type: "ERC20" | "NFT";
  isLocked?: boolean;
  supply?: number;
  abi?: any;
}

export const recipes: Recipe[] = [
  {
    name: "Axe",
    description: "Used for cutting and collecting wood",
    image: axe,
    type: "ERC20",
    address: "0xc65C99E4c3AAb25322d4E808e5e96Ec774330696",
    ingredients: [
      {
        name: "$SFF",
        amount: 1,
        image: coin,
      },
    ],
    abi: Axe,
  },
  {
    name: "Wood pickaxe",
    description: "Used for mining and collecting stone",
    image: woodPickaxe,
    type: "ERC20",
    address: "0x526439FCCd9494b61F9CfaA0c287Cb04a30F2D3f",
    ingredients: [
      {
        name: "Wood",
        amount: 5,
        image: wood,
      },
      {
        name: "$SFF",
        amount: 2,
        image: coin,
      },
    ],
    abi: Pickaxe,
  },
  {
    name: "Stone Pickaxe",
    abi: StonePickaxe,
    description: "Used for mining and collecting ore",
    image: pickaxe,
    type: "ERC20",
    address: "0xBDc6814D29fBA97a426057778ABe702079480b80",
    ingredients: [
      {
        name: "Wood",
        amount: 5,
        image: wood,
      },
      {
        name: "Stone",
        amount: 5,
        image: stone,
      },
      {
        name: "$SFF",
        amount: 2,
        image: coin,
      },
    ],
  },
  {
    name: "Iron Pickaxe",
    abi: IronPickaxe,
    description: "Used for mining and collecting gold",
    image: pickaxe,
    type: "ERC20",
    address: "0x4a223dDc81F3F73eeB2Cc7E625e6013A028fae62",
    ingredients: [
      {
        name: "Wood",
        amount: 10,
        image: wood,
      },
      {
        name: "Iron",
        amount: 10,
        image: iron,
      },
      {
        name: "$SFF",
        amount: 10,
        image: coin,
      },
    ],
  },
  {
    name: "Hammer",

    description: "Used for building barns, coops & other structures",
    image: hammer,
    type: "ERC20",
    address: "TODO",
    isLocked: true,
    ingredients: [
      {
        name: "Wood",
        amount: 5,
        image: wood,
      },
      {
        name: "$SFF",
        amount: 10,
        image: coin,
      },
    ],
  },
  {
    name: "Fishing rod",
    description: "Used for fishing and gathering fish",
    image: rod,
    type: "ERC20",
    address: "TODO",
    isLocked: true,
    ingredients: [
      {
        name: "Wood",
        amount: 5,
        image: wood,
      },
      {
        name: "$SFF",
        amount: 10,
        image: coin,
      },
    ],
  },
  {
    name: "Sword",
    description: "Used for fighting monsters and collecting rewards",
    image: sword,
    type: "ERC20",
    address: "TODO",
    isLocked: true,
    ingredients: [
      {
        name: "Wood",
        amount: 5,
        image: wood,
      },
      {
        name: "$SFF",
        amount: 10,
        image: coin,
      },
    ],
  },
  {
    name: "Chicken coop",
    description: "A unique coop that produces chickens & eggs",
    image: chickenCoop,
    type: "NFT",
    address: "TODO",
    isLocked: true,
    ingredients: [
      {
        name: "Wood",
        amount: 100,
        image: wood,
      },
      {
        name: "Stone",
        amount: 50,
        image: stone,
      },
      {
        name: "$SFF",
        amount: 100,
        image: coin,
      },
    ],
    supply: 5000,
  },
  {
    name: "Sunflower Statue",
    abi: Statue,
    description: "A symbol of the holy token",
    image: statue,
    type: "NFT",
    address: "0x71556745dA70F2103C50f0E577C1ACF8A9aAC05E",
    ingredients: [
      {
        name: "$SFF",
        amount: 50,
        image: coin,
      },
      {
        name: "Stone",
        amount: 50,
        image: stone,
      },
      {
        name: "Iron",
        amount: 50,
        image: iron,
      },
    ],
    supply: 1000,
  },
  {
    name: "Scarecrow",
    abi: Scarecrow,
    description: "Helps keep the crows away",
    image: scarecrow,
    type: "NFT",
    address: "0x143Ba32499065b5F89c518d5B75a38F3529cE324",
    ingredients: [
      {
        name: "$SFF",
        amount: 10,
        image: coin,
      },
      {
        name: "Wood",
        amount: 50,
        image: wood,
      },
    ],
    supply: 5000,
  },
  {
    name: "Christmas Tree",
    abi: ChristmasTree,
    description: "A christmas tree for the holidays",
    image: christmasTree,
    type: "NFT",
    address: "0x2fa133F8A7C9db0285BfF9984c29316482d9834d",
    ingredients: [
      {
        name: "$SFF",
        amount: 300,
        image: coin,
      },
      {
        name: "Wood",
        amount: 500,
        image: wood,
      },
    ],
    supply: 50,
  },
];

export const items: Item[] = [
  ...recipes,
  {
    name: "Stone",
    abi: Stone,
    description: "A natural resource in Sunflower Land used for crafting",
    image: stone,
    type: "ERC20",
    address: "0xE11e8ff4D9C10A7E4524e8fE6b4F1F3E8665eDCE",
  },
  {
    name: "Wood",
    abi: Wood,
    description: "A bountiful resource in Sunflower Land used for crafting",
    image: wood,
    type: "ERC20",
    address: "0xC8A6fFc3720867470A2395D1634B3085BbDDf71a",
  },

  {
    name: "Iron",
    abi: Iron,
    description: "A bountiful resource in Sunflower Land used for crafting",
    image: iron,
    type: "ERC20",
    address: "0x4a114F6EC3e0f6c57A9Db37140ca88Ee5525E55B",
  },
  {
    name: "Gold",
    abi: Gold,
    description: "A scarce resource in Sunflower Land used for crafting",
    image: iron,
    type: "ERC20",
    address: "0xbc7B1c141218C5d7BD1BEb8098BDe5D8a1e327E6",
  },
];

export type Inventory = Record<ItemName, number>;

export const DEFAULT_INVENTORY: Inventory = {
  Wood: 0,
  Stone: 0,
  Axe: 0,
  "Wood pickaxe": 0,
  "Stone Pickaxe": 0,
  "Iron Pickaxe": 0,
  Iron: 0,
  Gold: 0,
  "Sunflower Statue": 0,
  "Fishing rod": 0,
  "Chicken coop": 0,
  Hammer: 0,
  Sword: 0,
  Scarecrow: 0,
  "Christmas Tree": 0,
};
export type ItemName = Item["name"];
