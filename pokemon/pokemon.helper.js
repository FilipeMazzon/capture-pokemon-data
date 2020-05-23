const getNameFromObject = (object) => {
    return object.name;
}
const cleanMove = (move) => {
    const {
        accuracy,
        damage_class,
        effect_chance,
        effect_changes,
        power,
        pp,
        priority,
        target,
        type
    } = move;
    return {
        accuracy,
        damage_class: getNameFromObject(damage_class),
        effect_chance,
        effect_changes,
        power,
        pp,
        priority,
        target: getNameFromObject(target),
        type: getNameFromObject(type)
    }
}
const sortType = (a, b) => {
    return a.slot - b.slot;
}

const handleType = (typesBrute) => {
    typesBrute.sort(sortType)
    return typesBrute.map((types) => {
        return types.type.name;
    })
};

const handleStats = (statsBrute) => {
    const stats = {};
    const statsLength = Object.keys(statsBrute).length;
    for (let i = 0; i < statsLength; i++) {
        stats[statsBrute[i]['stat'].name] = statsBrute[i]['base_stat'];
    }
    return stats;
}

const handleEggGroup = (eggGroups = []) => {
    return eggGroups.map(eggGroup => {
        return eggGroup.name;
    })
}
const handleSkills = (skills, pokemonMoves) => {
    const skillsPokemons = {
        byLevel: [],
        byTutor: [],
        byMachine: [],
        byEgg: []
    };
    pokemonMoves.forEach(pokemonMove => {
        let move = {};
        move.name = pokemonMove.move.name;
        const moveId = parseInt(pokemonMove.move.url.split('/')[6]);
        Object.assign(move, cleanMove(skills[moveId - 1]));

        const byLevel = pokemonMove.version_group_details.find(detail => detail.move_learn_method.name === "level-up");
        move.requiredLevel = byLevel ? byLevel.level_learned_at : 0;
        if (byLevel) {
            skillsPokemons.byLevel.push(move)
        } else {
            const byTutor = pokemonMove.version_group_details.find(detail => detail.move_learn_method.name === "tutor");
            if (byTutor) {
                skillsPokemons.byTutor.push(move)
            }
            const byMachine = pokemonMove.version_group_details.find(detail => detail.move_learn_method.name === "machine");
            if (byMachine) {
                skillsPokemons.byMachine.push(move)
            }
            const byEgg = pokemonMove.version_group_details.find(detail => detail.move_learn_method.name === "egg");
            if (byEgg) {
                skillsPokemons.byEgg.push(move)
            }
        }
        return move;
    })
    return skillsPokemons;
};

const handleSpecialAbilities = (abilitiesPokemon) => {
    const abilities = {
        normal: [],
        hidden: [],
    };
    abilitiesPokemon.forEach(abilityPokemon => {
        let abilityName = abilityPokemon.ability.name;
        abilityPokemon.is_hidden
            ? abilities.hidden.push(abilityName)
            : abilities.normal.push(abilityName)
    })
    return abilities;
}
module.exports = {
    handleType,
    handleStats,
    handleEggGroup,
    handleSkills,
    handleSpecialAbilities
}