class MemoryBlock {
    constructor(size) {
        this.size = size;
        this.isAllocated = false;
    }
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

function simulateNextFit() {
    const memoryInput = document.getElementById("memory-blocks").value;
    const processInput = document.getElementById("process-sizes").value;

    if (!memoryInput || !processInput) {
        alert("Masukkan ukuran proses dan hole Memory terlebih dahulu.");
        return;
    }

    const memoryBlockSizes = memoryInput.split(",").map(Number);
    const processSizes = processInput.split(",").map(Number);

    let memoryBlocks = memoryBlockSizes.map(size => new MemoryBlock(size));
    let allocation = nextFit(memoryBlocks, processSizes);

    // Display Results in Table
    const tableBody = document.querySelector("#results-table-nextFit tbody");
    tableBody.innerHTML = ""; // Clear previous results

    processSizes.forEach((processSize, i) => {
        const row = document.createElement("tr");

        const processCell = document.createElement("td");
        processCell.textContent = `Process ${i + 1}`;
        row.appendChild(processCell);

        const sizeCell = document.createElement("td");
        sizeCell.textContent = `${processSize} MB`;
        row.appendChild(sizeCell);

        const fitCell = document.createElement("td");
        fitCell.textContent = allocation[i] !== -1
            ? `Hole ${allocation[i] + 1}`
            : "tidak bisa dialokasikan";
        row.appendChild(fitCell);

        tableBody.appendChild(row);
    });
}

document.getElementById("simulate-next-fit").addEventListener("click", simulateNextFit);
