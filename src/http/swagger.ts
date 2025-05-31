/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [employee, admin]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *
 *@swagger
 * /punch-clock:
 *   post:
 *     summary: Registrar ponto
 *     tags:
 *       - Punch Clock
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [checkIn, checkOut]
 *     responses:
 *       200:
 *         description: Ponto registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *
 * @swagger
 * /sessions:
 *   post:
 *     summary: Login de um usuário
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *
 * @swagger
 * /punch-clock/history:
 *   get:
 *     summary: Consultar histórico de pontos
 *     tags:
 *       - Punch Clock
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Histórico de pontos retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                   check-in:
 *                     type: string
 *                   check-out:
 *                     type: string
 *                   hours_worked:
 *                     type: number
 *
 * @swagger
 * /admin/punch-clock:
 *   get:
 *     summary: Listar todos os registros dos funcionários
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID do funcionário (opcional)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: filtro data de início (opcional)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: filtro data de témino (opcional)
 *     responses:
 *       200:
 *         description: Registros retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   employee:
 *                     type: string
 *                   date:
 *                     type: string
 *                   check-in:
 *                     type: string
 *                   check-out:
 *                     type: string
 *                   hours_worked:
 *                     type: number
 *
 * @swagger
 * /admin/reports:
 *   get:
 *     summary: Listar relatório de horas trabalhadas
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: filtro data de início (opcional)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: filtro data de témino (opcional)
 *     responses:
 *       200:
 *         description: Relatório retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_hours:
 *                   type: number
 *                 employees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       hours_worked:
 *                         type: number
 */
