class MemoryBlock {
    constructor(size) {
        this.size = size;
        this.isAllocated = false;
    }
}

function firstFit(memoryBlocks, processSizes) {
    let allocation = Array(processSizes.length).fill(-1);

    processSizes.forEach((processSize, i) => {
        for (let j = 0; j < memoryBlocks.length; j++) {
            if (!memoryBlocks[j].isAllocated && memoryBlocks[j].size >= processSize) {
                allocation[i] = j;
                memoryBlocks[j].isAllocated = true;
                break;
            }
        }
    });

    return allocation;
}

function nextFit(memoryBlocks, processSizes) {
    let allocation = Array(processSizes.length).fill(-1);
    let lastAllocatedIndex = 0;

    processSizes.forEach((processSize, i) => {
        let startIndex = lastAllocatedIndex;
        let allocated = false;

        do {
            if (!memoryBlocks[lastAllocatedIndex].isAllocated && memoryBlocks[lastAllocatedIndex].size >= processSize) {
                allocation[i] = lastAllocatedIndex;
                memoryBlocks[lastAllocatedIndex].isAllocated = true;
                allocated = true;
                break;
            }
            lastAllocatedIndex = (lastAllocatedIndex + 1) % memoryBlocks.length;
        } while (lastAllocatedIndex !== startIndex);
    });

    return allocation;
}

document.getElementById("simulate-btn").addEventListener("click", () => {
    const memoryInput = document.getElementById("memory-blocks").value;
    const processInput = document.getElementById("process-sizes").value;

    if (!memoryInput || !processInput) {
        alert("Masukkan ukuran proses dan hole Memory terlebih dahulu.");
        return;
    }

    const memoryBlockSizes = memoryInput.split(",").map(Number);
    const processSizes = processInput.split(",").map(Number);

    // First Fit
    const memoryBlocksFF = memoryBlockSizes.map(size => new MemoryBlock(size));
    const allocationFF = firstFit(memoryBlocksFF, processSizes);

    // Next Fit
    const memoryBlocksNF = memoryBlockSizes.map(size => new MemoryBlock(size));
    const allocationNF = nextFit(memoryBlocksNF, processSizes);

    
    // Display Results in Table
    const tableBody = document.querySelector("#results-table tbody");
    tableBody.innerHTML = ""; // Clear previous results

    processSizes.forEach((processSize, i) => {
        const row = document.createElement("tr");

        const processCell = document.createElement("td");
        processCell.textContent = `Process ${i + 1}`;
        row.appendChild(processCell);

        const sizeCell = document.createElement("td");
        sizeCell.textContent = `${processSize} MB`;
        row.appendChild(sizeCell);

        const firstFitCell = document.createElement("td");
        firstFitCell.textContent = allocationFF[i] !== -1
            ? `Hole ${allocationFF[i] + 1}`
            : "tidak bisa dialokasikan";
        row.appendChild(firstFitCell);

        const nextFitCell = document.createElement("td");
        nextFitCell.textContent = allocationNF[i] !== -1
            ? `Hole ${allocationNF[i] + 1}`
            : "tidak bisa dialokasikan";
        row.appendChild(nextFitCell);

        tableBody.appendChild(row);
    });
    
});