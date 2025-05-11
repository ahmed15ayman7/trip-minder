'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
} from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import { baseUrl } from '@/services/api';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('كلمات المرور غير متطابقة');
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/auth/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (response.data) {
                toast.success('تم إنشاء الحساب بنجاح');
                router.push('/auth/login');
            }
        } catch (error) {
            toast.error('حدث خطأ أثناء التسجيل');
        }
    };

    return (
        <Container component="main" maxWidth="xs" className=' min-h-[80vh] flex flex-col justify-center items-center'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            إنشاء حساب جديد
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="الاسم"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="البريد الإلكتروني"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="كلمة المرور"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="تأكيد كلمة المرور"
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: "#ff6600" }}
                            >
                                تسجيل
                            </Button>
                            <Box sx={{ textAlign: 'center' }}>
                                <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                                    <Typography variant="body2" color="#ff6600">
                                        لديك حساب بالفعل؟ سجل دخولك
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </motion.div>
        </Container>
    );
} 