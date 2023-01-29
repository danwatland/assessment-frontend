import { canComponentBeDisplayed } from './ComponentDisplayHelpers';

describe('Component Display Helpers', () => {
    let pageData: PageData;

    beforeEach(() => {
        pageData = {
            variables: [],
            lists: [],
            components: []
        };
    });

    it('should display a component not tied to any conditions', () => {
        pageData.components = [{
            id: 1,
            type: 'image',
            options: {
                alt: 'alt text',
                src: 'some image url'
            }
        }];
        pageData.lists = [{
            id: 0,
            components: [1]
        }];

        const result = canComponentBeDisplayed(1, pageData);

        expect(result).toEqual(true);
    });

    it('should display a component tied to a condition if the condition is met', () => {
        pageData.components = [{
            id: 1,
            type: 'image',
            options: {
                alt: 'alt text',
                src: 'some image url'
            }
        }, {
            id: 2,
            type: 'condition',
            options: {
                variable: 'show_image',
                value: 'show'
            },
            children: 1
        }];
        pageData.lists = [{
            id: 0,
            components: [2]
        }, {
            id: 1,
            components: [1]
        }];

        const result = canComponentBeDisplayed(1, pageData, { 'show_image': 'show' });

        expect(result).toEqual(true);
    });

    it('should not display a component tied to a condition if the condition is not met', () => {
        pageData.components = [{
            id: 1,
            type: 'image',
            options: {
                alt: 'alt text',
                src: 'some image url'
            }
        }, {
            id: 2,
            type: 'condition',
            options: {
                variable: 'show_image',
                value: 'show'
            },
            children: 1
        }];
        pageData.lists = [{
            id: 0,
            components: [2]
        }, {
            id: 1,
            components: [1]
        }];

        const result = canComponentBeDisplayed(1, pageData, { 'show_image': 'hide' });

        expect(result).toEqual(false);
    });

    it('should display a component tied to multiple conditions if all of them are met', () => {
        pageData.components = [{
            id: 1,
            type: 'image',
            options: {
                alt: 'alt text',
                src: 'some image url'
            }
        }, {
            id: 2,
            type: 'condition',
            options: {
                variable: 'show_image',
                value: 'show'
            },
            children: 1
        }, {
            id: 3,
            type: 'condition',
            options: {
                variable: 'location',
                value: 'ny'
            },
            children: 2
        }];
        pageData.lists = [{
            id: 0,
            components: [2]
        }, {
            id: 1,
            components: [1]
        }, {
            id: 2,
            components: [2]
        }];

        const result = canComponentBeDisplayed(1, pageData, { 'show_image': 'show', 'location': 'ny' });

        expect(result).toEqual(true);
    });

    it('should not display a component tied to multiple conditions if any of them are not met', () => {
        pageData.components = [{
            id: 1,
            type: 'image',
            options: {
                alt: 'alt text',
                src: 'some image url'
            }
        }, {
            id: 2,
            type: 'condition',
            options: {
                variable: 'show_image',
                value: 'show'
            },
            children: 1
        }, {
            id: 3,
            type: 'condition',
            options: {
                variable: 'location',
                value: 'ny'
            },
            children: 2
        }];
        pageData.lists = [{
            id: 0,
            components: [3]
        }, {
            id: 1,
            components: [1]
        }, {
            id: 2,
            components: [2]
        }];

        const result = canComponentBeDisplayed(1, pageData, { 'show_image': 'show', 'location': 'sf' });

        expect(result).toEqual(false);
    });
});
