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

function simulateFirstFit() {
    const memoryInput = document.getElementById("memory-blocks").value;
    const processInput = document.getElementById("process-sizes").value;

    if (!memoryInput || !processInput) {
        alert("Masukkan ukuran proses dan hole Memory terlebih dahulu.");
        return;
    }

    const memoryBlockSizes = memoryInput.split(",").map(Number);
    const processSizes = processInput.split(",").map(Number);

    let memoryBlocks = memoryBlockSizes.map(size => new MemoryBlock(size));
    let allocation = firstFit(memoryBlocks, processSizes);

    // Display Results in Table
    const tableBody = document.querySelector("#results-table-firstFit tbody");
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

document.getElementById("simulate-first-fit").addEventListener("click", simulateFirstFit);
