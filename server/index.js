const exp = require('express');
const crs = require('cors');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const app = exp();
const PORT = 5000;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

app.use(crs());
app.use(exp.json())

const starterQuotes = [
    { text: "Eat. Sleep. Code. Repeat.", author: "Dev Life" },
    { text: "Hello World!, Hello Future!", author: "Coder" },
    { text: "It's not a bug, it's a feature!", author: "Programmer" }
];

app.get('/api/quotes', async (req, res) => {
    try {
        const quotes = await prisma.quote.findMany();
        res.json(quotes);
    } catch (error) {
        console.error('Could not load quotes:', error);
        res.status(500).json({ error: 'Could not load quotes' });
    }
});

app.get('/api/quote', async (req, res) => {
    try {
        const quotes = await prisma.quote.findMany();
        if (quotes.length === 0) {
            return res.status(404).json({ error: 'No quotes found' });
        }
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        res.json(quote);
    } catch (error) {
        console.error('Could not load a quote:', error);
        res.status(500).json({ error: 'Could not load a quote' });
    }
});

async function startServer() {
    const quoteCount = await prisma.quote.count();
    if (quoteCount === 0) {
        await prisma.quote.createMany({ data: starterQuotes });
    }

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer().catch(async (error) => {
    console.error('Could not start the server:', error);
    await prisma.$disconnect();
    process.exit(1);
});
