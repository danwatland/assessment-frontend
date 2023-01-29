const calculateDisplayedComponentIds = (pageData: PageData, variables: Dictionary): number[] => pageData.components
    .filter((component) => canComponentBeDisplayed(component.id, pageData, variables))
    .map((component) => component.id);

const canComponentBeDisplayed = (componentId: number, pageData: PageData, variables?: Dictionary): boolean => {
    const listsContainingComponentId = pageData.lists.filter((list) => list.id !== 0).filter((list) => list.components.includes(componentId));

    if (variables && listsContainingComponentId.length > 0) {
        const results = listsContainingComponentId
            .map((list) => {
                const componentControllingList = pageData.components.find((component) => component.children === list.id);
                const options = componentControllingList.options as ConditionOptions;
                if (options.value === variables[options.variable]) {
                    return canComponentBeDisplayed(componentControllingList.id, pageData, variables);
                }
                return false;
            });

        return results.some((result) => result);
    }

    return true;
};

export {
    calculateDisplayedComponentIds,
    canComponentBeDisplayed
}
