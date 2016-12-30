import { combineReducers } from 'redux';
import * as types from '../actions/types';
var Immutable = require('immutable');

export const defaultState = Immutable.fromJS({
  infoDocs: {
    "ArtifactInfo": false,
    "EquipmentInfo": false,
    "HeroInfo": false,
    "HeroSkillInfo": false,
    "HeroImprovementInfo": false,
    "LocalizationInfo": false,
    "PetInfo": false,
    "PlayerImprovementInfo": false,
    "SkillInfo": false,
  },
  gamestate: {
    info: {},
    swordmaster: {},
    artifacts: {
      levels: {
        Artifact4: 234
      }
    },
    heroes: {},
    equipment: {},
    pets: {},
    skills: {},
    clan: {},
  },
  steps: {
    "Artifact 5": {
      key: "Artifact 5",
      value: 34,
      cost: 1523
    },
    "Artifact 12": {
      key: "Artifact 12",
      value: 52,
      cost: 6543
    }
  },
  test: 0
});

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.LOADED_CSV:
      console.log("setting: " + action.infoName);
      return state.setIn(['infoDocs', action.infoName], true);

    case types.SWORDMASTER_CHANGED:
      return state.setIn(['gamestate', 'swordmaster'], action.newLevel);
    case types.HERO_LEVEL_CHANGED:
      return state.setIn(['gamestate', 'heroes', 'levels', action.hid], action.newLevel);
    case types.HERO_WEAPON_CHANGED:
      return state.setIn(['gamestate', 'heroes', 'weapons', action.hid], action.newLevel);
    case types.ARTIFACT_LEVEL_CHANGED:
      return state.setIn(['gamestate', 'artifacts', 'levels', action.aid], action.newLevel);
    case types.PET_LEVEL_CHANGED:
      return state.setIn(['gamestate', 'pets', 'levels', action.pid], action.newLevel);
    case types.PET_ACTIVE_CHANGED:
      return state.setIn(['gamestate', 'pets', 'active'], action.pid);
    case types.EQUIPMENT_CHANGED:
      return state.setIn(['gamestate', 'equipment', action.eid, 'level'], action.newLevel);
    case types.EQUIPMENT_ACTIVE_CHANGED:
      // unequip all others in that category
      return state.setIn(['gamestate', 'equipment', action.eid, 'equipped'], true);
    case types.SKILL_LEVEL_CHANGED:
      return state.setIn(['gamestate', 'skills', action.sid], action.newLevel);

    case types.TEST:
      return state.set('test', action.value);
    default:
      return state;
  }
}

export default rootReducer;