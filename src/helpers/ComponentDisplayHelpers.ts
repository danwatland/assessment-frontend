const calculateDisplayedComponentIds = (pageData: PageData, variables: Dictionary): number[] => pageData.components
    .filter((component) => canComponentBeDisplayed(component.id, pageData, variables))
    .map((component) => component.id);

const canComponentBeDisplayed = (componentId: number, pageData: PageData, variables?: Dictionary): boolean => {
    const listContainingComponentId = pageData.lists.find((list) => list.components.includes(componentId));

    if (variables && listContainingComponentId!.id !== 0) {
        const componentControllingList = pageData.components.find((component) => component.children === listContainingComponentId!.id);
        const options = componentControllingList.options as ConditionOptions;
        if (options.value === variables[options.variable]) {
            return canComponentBeDisplayed(componentControllingList.id, pageData, variables);
        }
        return false;
    }

    return true;
}

export {
    calculateDisplayedComponentIds,
    canComponentBeDisplayed
}
