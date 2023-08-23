#include <stdio.h>
#include <stdlib.h>

// Definição da estrutura do nó da árvore
struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

// Função para criar um novo nó
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->left = newNode->right = NULL;
    return newNode;
}

// Função para inserir um nó na árvore
struct Node* insert(struct Node* root, int data) {
    if (root == NULL) {
        return createNode(data);
    }

    if (data < root->data) {
        root->left = insert(root->left, data);
    } else if (data > root->data) {
        root->right = insert(root->right, data);
    }

    return root;
}

// Função para percorrer a árvore por profundidade (em ordem)
void inorderTraversal(struct Node* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        printf("%d ", root->data);
        inorderTraversal(root->right);
    }
}

// Função para percorrer a árvore por largura (em nível)
void breadthFirstTraversal(struct Node* root) {
    if (root == NULL) {
        return;
    }

    struct Node* queue[100]; // Usando uma fila simples
    int front = 0, rear = 0;
    queue[rear++] = root;

    while (front < rear) {
        struct Node* current = queue[front++];
        printf("%d ", current->data);

        if (current->left != NULL) {
            queue[rear++] = current->left;
        }
        if (current->right != NULL) {
            queue[rear++] = current->right;
        }
    }
}

// Função para buscar um valor na árvore por profundidade
struct Node* search(struct Node* root, int target) {
    if (root == NULL || root->data == target) {
        return root;
    }

    if (target < root->data) {
        return search(root->left, target);
    } else {
        return search(root->right, target);
    }
}

int main() {
    struct Node* root = NULL;
    int values[] = {10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 19, 20};
    int numValues = sizeof(values) / sizeof(values[0]);

    for (int i = 0; i < numValues; ++i) {
        root = insert(root, values[i]);
    }

    printf("Inorder Traversal (Profundidade): ");
    inorderTraversal(root);
    printf("\n");

    printf("Breadth-First Traversal (Largura): ");
    breadthFirstTraversal(root);
    printf("\n");

    int searchValue = 11;
    struct Node* foundNode = search(root, searchValue);
    if (foundNode != NULL) {
        printf("Node with value %d found!\n", searchValue);
    } else {
        printf("Node with value %d not found.\n", searchValue);
    }

    return 0;
}